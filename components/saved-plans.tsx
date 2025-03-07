"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import type { TripDocument, Budget, TravelMode } from "./types";
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Star,
  Trash2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface SavedPlansProps {
  trips: TripDocument[];
  formatBudgetLabel: (budget: Budget) => string;
  formatTravelModeLabel: (mode: TravelMode) => string;
  deleteTrip?: (id: string) => void;
  setActiveTab: React.Dispatch<React.SetStateAction<"form" | "saved">>;
}

const SavedPlans: React.FC<SavedPlansProps> = ({
  trips,
  formatBudgetLabel,
  formatTravelModeLabel,
  deleteTrip,
  setActiveTab,
}) => {
  const [expandedTrip, setExpandedTrip] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState<string>("day1");

  if (trips.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-primary/10 p-4 mb-4">
            <Calendar className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-center mb-2">
            No trips found
          </h3>
          <p className="text-muted-foreground text-center mb-6">
            You haven't created any trip plans yet.
          </p>
          <Button variant="default" onClick={() => setActiveTab("form")}>
            Go to "Create New Plan"
          </Button>
        </CardContent>
      </Card>
    );
  }

  const toggleExpand = (id: any) => {
    if (expandedTrip === id) {
      setExpandedTrip(null);
    } else {
      setExpandedTrip(id);
      setActiveDay("day1"); // Reset to day1 when expanding a new trip
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {trips.map((trip) => {
        const isExpanded = expandedTrip === trip._id;
        const plan = trip.travelPlan;

        return (
          <Card
            key={trip._id}
            className="overflow-hidden border-none shadow-lg"
          >
            <CardHeader
              onClick={() => toggleExpand(trip._id)}
              className={`cursor-pointer transition-colors ${
                isExpanded ? "bg-primary/5" : "hover:bg-primary/5"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <CardTitle className="text-xl text-primary">
                      {plan?.location || trip.destination}
                    </CardTitle>
                  </div>
                  <CardDescription className="mt-2 flex flex-wrap gap-3">
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Calendar className="h-3 w-3" />
                      {trip.days} days
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Users className="h-3 w-3" />
                      {formatTravelModeLabel(trip.travelMode)}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <DollarSign className="h-3 w-3" />
                      {formatBudgetLabel(trip.budget)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Created: {new Date(trip.timestamp).toLocaleDateString()}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (deleteTrip && trip._id) deleteTrip(trip._id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    <span className="sr-only">Delete</span>
                  </Button>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </div>
            </CardHeader>

            {isExpanded && plan && (
              <CardContent className="p-0">
                <div className="p-6 space-y-6">
                  {/* Hotel Section */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Star className="h-5 w-5 text-amber-500" />
                      Recommended Hotels
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {plan.hotels.map((hotel, index) => (
                        <Link
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            hotel.hotelName
                          )}`}
                          target="_blank"
                          key={index}
                          className="group relative block overflow-hidden rounded-xl border bg-background transition-all hover:shadow-md"
                        >
                          <div className="aspect-video w-full overflow-hidden">
                            <img
                              src="https://media.gettyimages.com/id/1208302982/photo/beachfront-swimming-pool.jpg?s=612x612&w=0&k=20&c=SSPp1Uwl5IDI4o7kJHgkp6vmGzJ34mnjT9I-9XUOE5g="
                              alt={hotel.hotelName}
                              className="h-full w-full object-cover transition-transform group-hover:scale-105"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://placehold.co/600x400?text=Hotel+Image";
                              }}
                            />
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-primary text-primary-foreground">
                                ★ {hotel.rating}
                              </Badge>
                            </div>
                          </div>
                          <div className="p-4">
                            <h5 className="font-medium line-clamp-1">
                              {hotel.hotelName}
                            </h5>
                            <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                              {hotel.hotelAddress}
                            </p>
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-primary">
                                {hotel.price}
                              </p>
                              <ExternalLink className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Itinerary Section */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Itinerary
                    </h4>

                    {/* Day Selection Tabs */}
                    <Tabs
                      defaultValue="day1"
                      value={activeDay}
                      onValueChange={setActiveDay}
                      className="w-full"
                    >
                      <TabsList className="w-full justify-start mb-4 overflow-x-auto">
                        {Object.keys(plan.itinerary).map((day) => (
                          <TabsTrigger
                            key={day}
                            value={day}
                            className="min-w-[80px]"
                          >
                            {day.replace("day", "Day ")}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {/* Current Day Details */}
                      {Object.keys(plan.itinerary).map((day) => (
                        <TabsContent key={day} value={day} className="mt-0">
                          <div className="mb-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                              <h5 className="font-semibold text-lg">
                                {plan.itinerary[day].theme}
                              </h5>
                              <Badge
                                variant="secondary"
                                className="flex items-center gap-1 w-fit"
                              >
                                <Clock className="h-3 w-3" />
                                Best Time: {plan.itinerary[day].bestTimeToVisit}
                              </Badge>
                            </div>

                            {/* Places for the current day */}
                            <div className="space-y-4">
                              {plan.itinerary[day].places.map(
                                (place, index) => (
                                  <Link
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                      place.placeName
                                    )}`}
                                    target="_blank"
                                    key={index}
                                    className="block overflow-hidden rounded-xl border bg-background transition-all hover:shadow-md"
                                  >
                                    <div className="flex flex-col md:flex-row">
                                      <div className="md:w-1/3 aspect-video md:aspect-auto md:h-auto overflow-hidden">
                                        <img
                                          src="https://media.gettyimages.com/id/1208302982/photo/beachfront-swimming-pool.jpg?s=612x612&w=0&k=20&c=SSPp1Uwl5IDI4o7kJHgkp6vmGzJ34mnjT9I-9XUOE5g="
                                          alt={place.placeName}
                                          className="h-full w-full object-cover"
                                          onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                              "https://placehold.co/600x400?text=Place+Image";
                                          }}
                                        />
                                      </div>
                                      <div className="md:w-2/3 p-4">
                                        <div className="flex items-start justify-between">
                                          <h6 className="font-semibold text-lg mb-2">
                                            {place.placeName}
                                          </h6>
                                          <ExternalLink className="h-4 w-4 text-muted-foreground ml-2 mt-1 flex-shrink-0" />
                                        </div>
                                        <p className="text-muted-foreground mb-3 line-clamp-3">
                                          {place.placeDetails}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                          <Badge
                                            variant="outline"
                                            className="flex items-center gap-1"
                                          >
                                            <DollarSign className="h-3 w-3" />
                                            {place.ticketPricing}
                                          </Badge>
                                          {place.travelTime !==
                                            "N/A (Start Point)" && (
                                            <Badge
                                              variant="outline"
                                              className="flex items-center gap-1"
                                            >
                                              <Clock className="h-3 w-3" />
                                              {place.travelTime}
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                )
                              )}
                            </div>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default SavedPlans;
