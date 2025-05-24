"use client";

import { Occasion } from "@/generated/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchIcon, ImageIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import EditOccasionDialog from "./EditOccasionDialog";
import { CldImage } from "next-cloudinary";

export default function OccasionTable({
  initialOccasions,
}: {
  initialOccasions: Occasion[] | undefined | null;
}) {
  const [occasions, setOccasions] = useState<Occasion[] | undefined | null>(
    initialOccasions
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOccasions = occasions?.filter((occasion) =>
    occasion.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateOccasion = (updatedOccasion: Occasion) => {
    setOccasions(
      occasions?.map((occasion) =>
        occasion.id === updatedOccasion.id ? updatedOccasion : occasion
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search occasions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOccasions?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No occasions found.
                </TableCell>
              </TableRow>
            ) : (
              filteredOccasions?.map((occasion) => (
                <TableRow key={occasion.id}>
                  <TableCell>
                    {occasion.image ? (
                      <div className="relative h-10 w-10 rounded-md overflow-hidden">
                        <CldImage
                          src={occasion.image}
                          alt={occasion.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{occasion.name}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <EditOccasionDialog
                        occasion={occasion}
                        onSaveAction={updateOccasion}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
