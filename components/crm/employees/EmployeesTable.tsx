"use client";
import { DialogClose } from "@/components/ui/dialog";
import { Role, User } from "@/generated/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  changeImage,
  changeRole,
  fireEmployee,
  unFireEmployee,
} from "@/actions/employees";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ban, Check } from "lucide-react";
import ImageUpload from "@/components/ui/image-upload";

export default function EmployeesTable({ employees }: { employees: User[] }) {
  const router = useRouter();

  const handleRoleChange = async (id: string, role: Role) => {
    try {
      await changeRole(id, role);
      toast.success("Role changed");
      router.refresh();
    } catch (error) {
      console.error("Failed to change role:", error);
      toast.error("Failed to change role");
    }
  };

  const handleFireEmployee = async (id: string, isFired: boolean) => {
    try {
      if (isFired) {
        await unFireEmployee(id);
        toast.success("Employee unfired");
      } else {
        await fireEmployee(id);
        toast.success("Employee fired");
      }
      router.refresh();
    } catch (error) {
      console.error("Failed to fire employee:", error);
      toast.error("Failed to fire employee");
    }
  };

  const handleImageChange = async (id: string, image: string) => {
    try {
      await changeImage(id, image);
      toast.success("Image changed");
      router.refresh();
    } catch (error) {
      console.error("Failed to change image:", error);
      toast.error("Failed to change image");
    }
  };

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Fired</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <div className="relative size-10 overflow-hidden rounded-full">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Image
                          src={employee.image || ""}
                          alt={employee.firstName + " image"}
                          fill
                          className="object-cover"
                        />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Change image</DialogTitle>
                        </DialogHeader>
                        <ImageUpload
                          value={employee.image || ""}
                          onChange={(value) =>
                            handleImageChange(employee.id, value)
                          }
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>
                  <Select
                    value={employee.role}
                    onValueChange={(value) =>
                      handleRoleChange(employee.id, value as Role)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="MANAGER">Manager</SelectItem>
                      <SelectItem value="STAFF">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{employee.isFired ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        title={
                          employee.isFired ? "Unfire employee" : "Fire employee"
                        }
                      >
                        {employee.isFired ? <Check /> : <Ban />}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {employee.isFired
                            ? "Unfire employee"
                            : "Fire employee"}
                        </DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        {employee.isFired
                          ? "Are you sure you want to unfire this employee?"
                          : "Are you sure you want to fire this employee?"}
                      </DialogDescription>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleFireEmployee(employee.id, employee.isFired)
                            }
                          >
                            {employee.isFired ? "Unfire" : "Fire"}
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
