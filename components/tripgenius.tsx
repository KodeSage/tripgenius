"use client";
import { useState } from "react";
import { useFireproof } from "use-fireproof";
import type { TripDocument, Budget, TravelMode, TripPlan } from "./types";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "react-toastify";
import { AI_Prompt, chatSession } from "./services";
import SavedPlans from "./saved-plans";
import {
  Calendar,
  DollarSign,
  Globe,
  Loader2,
  MapPin,
  Plus,
  Save,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function TripGenius() {
  const [activeTab, setActiveTab] = useState<"form" | "saved">("form");
  const [loading, setLoading] = useState<boolean>(false);
  // Initialize Fireproof database
  const { useDocument, useLiveQuery, database } = useFireproof("trip-genius");

  const formatBudgetLabel = (budget: Budget): string => {
    switch (budget) {
      case "cheap":
        return "Low ($0 - $1000)";
      case "moderate":
        return "Medium ($1000 - $2500)";
      case "luxury":
        return "High ($2500+)";
      default:
        return budget;
    }
  };

  // Format travel mode label
  const formatTravelModeLabel = (mode: TravelMode): string => {
    return mode.charAt(0).toUpperCase() + mode.slice(1);
  };

  // Form state management with useDocument
  const { doc, merge, submit, reset } = useDocument<TripDocument>({
    destination: "",
    days: 3,
    budget: "cheap",
    travelMode: "solo",
    timestamp: Date.now(),
  });

  const result = useLiveQuery("timestamp", {
    descending: true,
  });

  const trips = result.docs as (TripDocument & { _id: string })[];

  // Function to delete a trip
  const deleteTrip = async (id: string) => {
    try {
      // Check if running in a browser environment
      //  if (
      //    typeof window !== "undefined" &&
      //    window.confirm("Are you sure you want to delete this trip plan?")
      //  ) {
      //    await database.del(id);
      //    toast.success("Trip plan deleted successfully");
      //  }
      await database.del(id);
      toast.success("Trip plan deleted successfully");
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast.error("Failed to delete trip plan");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validate form input
      if (
        !doc.destination ||
        !doc.destination.trim() ||
        doc.days < 1 ||
        doc.days > 5 ||
        !doc.travelMode ||
        !doc.budget
      ) {
        toast.error("Please fill all details correctly");
        setLoading(false);
        return;
      }
      if (!chatSession) {
        toast.error("Chat service is not available");
        setLoading(false);
        return;
      }

      // Construct the prompt and get response
      const final_prompt = AI_Prompt.replace("{location}", doc.destination)
        .replace("{totaldays}", String(doc.days))
        .replace("{couples}", doc.travelMode)
        .replace("{cheap}", doc.budget)
        .replace("{totaldays}", String(doc.days));

      const result = await chatSession.sendMessage(final_prompt);

      // Parse the response
      try {
        const responseText = result?.response?.text() || "[]";
        console.log("API Response:", responseText);

        const travelData = JSON.parse(responseText);

        // Verify we have a valid travelPlan object
        if (travelData && travelData[0] && travelData[0].travelPlan) {
          const travelPlan: TripPlan = travelData[0].travelPlan;
          console.log("Travel Plan:", travelPlan);

          // Make sure required properties exist
          if (
            travelPlan.location &&
            travelPlan.hotels &&
            Array.isArray(travelPlan.hotels) &&
            travelPlan.itinerary &&
            Object.keys(travelPlan.itinerary).length > 0
          ) {
            // Merge the travelPlan and submit
            const newTripDoc: TripDocument = {
              destination: doc.destination,
              days: doc.days,
              budget: doc.budget,
              travelMode: doc.travelMode,
              timestamp: Date.now(),
              travelPlan: travelPlan,
            };

            // Save directly with database.put instead of using useDocument's submit
            const result = await database.put(newTripDoc);
            console.log("Trip plan saved successfully with ID:", result.id);
            await submit();
            toast.success("Trip Successfully Generated");
            reset();
            setActiveTab("saved");
          } else {
            throw new Error("Travel plan is incomplete");
          }
        } else {
          throw new Error("No valid travel plan found in the response");
        }
      } catch (parseError) {
        console.error("Error parsing travel plan:", parseError);
        toast.error("Failed to generate a valid trip plan. Please try again.");
      }
    } catch (error) {
      console.error("Error generating trip plan:", error);
      toast.error("An error occurred while generating the trip plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Globe className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">TripGenius</h1>
          <p className="text-muted-foreground">
            Smart trip planning at your fingertips
          </p>
        </header>

        <Tabs
          defaultValue="form"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "form" | "saved")}
          className="max-w-4xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="form" className="text-base">
              <Plus className="h-4 w-4 mr-2" />
              Create New Plan
            </TabsTrigger>
            <TabsTrigger value="saved" className="text-base">
              <Save className="h-4 w-4 mr-2" />
              Saved Plans
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="mt-0">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Create Your Trip Plan</CardTitle>
                <CardDescription>
                  Fill in the details below to generate a personalized travel
                  itinerary
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="destination" className="text-base">
                      Destination
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <GooglePlacesAutocomplete
                        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}
                        selectProps={{
                          value: doc.destination
                            ? { label: doc.destination, value: doc.destination }
                            : null,
                          onChange: (option) => {
                            // Extract the description as the value to store
                            if (option && option.label) {
                              merge({ destination: option.label });
                            } else if (
                              option &&
                              typeof option.value === "string"
                            ) {
                              merge({ destination: option.value });
                            } else {
                              merge({ destination: null });
                            }
                          },
                          styles: {
                            control: (provided) => ({
                              ...provided,
                              paddingLeft: "2rem",
                              borderRadius: "0.5rem",
                              borderColor: "hsl(var(--border))",
                              boxShadow: "none",
                              "&:hover": {
                                borderColor: "hsl(var(--border))",
                              },
                            }),
                            menu: (provided) => ({
                              ...provided,
                              borderRadius: "0.5rem",
                              overflow: "hidden",
                              marginTop: "0.5rem",
                              boxShadow:
                                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isFocused
                                ? "hsl(var(--primary) / 0.1)"
                                : "transparent",
                              color: state.isFocused
                                ? "hsl(var(--primary))"
                                : "inherit",
                              cursor: "pointer",
                              ":active": {
                                backgroundColor: "hsl(var(--primary) / 0.2)",
                              },
                            }),
                          },
                          placeholder: "Search for a destination...",
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="days" className="text-base">
                      Number of Days (1-5)
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <Input
                        id="days"
                        type="number"
                        min="1"
                        max="5"
                        value={doc.days}
                        onChange={(e) =>
                          merge({ days: Number.parseInt(e.target.value) })
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base">Budget</Label>
                    <RadioGroup
                      value={doc.budget}
                      onValueChange={(value) =>
                        merge({ budget: value as Budget })
                      }
                      className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                    >
                      {(["cheap", "moderate", "luxury"] as Budget[]).map(
                        (budget) => (
                          <div
                            key={budget}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={budget}
                              id={`budget-${budget}`}
                            />
                            <Label
                              htmlFor={`budget-${budget}`}
                              className="flex items-center gap-1.5"
                            >
                              <DollarSign
                                className={`h-4 w-4 ${
                                  budget === "luxury"
                                    ? "text-amber-500"
                                    : budget === "moderate"
                                    ? "text-emerald-500"
                                    : "text-blue-500"
                                }`}
                              />
                              {formatBudgetLabel(budget)}
                            </Label>
                          </div>
                        )
                      )}
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base">Travel Mode</Label>
                    <RadioGroup
                      value={doc.travelMode}
                      onValueChange={(value) =>
                        merge({ travelMode: value as TravelMode })
                      }
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      {(
                        ["solo", "family", "couples", "friends"] as TravelMode[]
                      ).map((mode) => (
                        <div key={mode} className="flex items-center space-x-2">
                          <RadioGroupItem value={mode} id={`mode-${mode}`} />
                          <Label
                            htmlFor={`mode-${mode}`}
                            className="flex items-center gap-1.5"
                          >
                            <Users className="h-4 w-4 text-primary" />
                            {formatTravelModeLabel(mode)}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading || !doc.destination}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Plan...
                      </>
                    ) : (
                      "Generate Trip Plan"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="mt-0">
            <SavedPlans
              trips={trips.filter((trip) => trip.travelPlan !== undefined)}
              formatBudgetLabel={formatBudgetLabel}
              formatTravelModeLabel={formatTravelModeLabel}
              deleteTrip={deleteTrip}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default TripGenius;
