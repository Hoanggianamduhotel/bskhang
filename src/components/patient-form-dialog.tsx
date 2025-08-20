import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { capitalizeVietnameseName, calculateAge, insertPatientSchema, type InsertPatient } from '@/lib/schema';
import { Plus } from 'lucide-react';

interface PatientFormDialogProps {
  onPatientAdded?: (patient: any) => void;
}

export default function PatientFormDialog({ onPatientAdded }: PatientFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertPatient>({
    resolver: zodResolver(insertPatientSchema.extend({
      ho_ten: insertPatientSchema.shape.ho_ten.transform(capitalizeVietnameseName),
    })),
    defaultValues: {
      ho_ten: '',
      ngay_sinh: '',
      dia_chi: '',
      so_dien_thoai: '',
      can_nang: '',
      thang_tuoi: 0,
    },
  });

  const onSubmit = async (data: InsertPatient) => {
    setLoading(true);
    try {
      // Calculate age in months
      const ageData = calculateAge(data.ngay_sinh);
      const finalData = {
        ...data,
        thang_tuoi: ageData.months,
      };

      // Here you would normally send to API
      console.log('Patient data:', finalData);
      
      toast({
        title: 'Thành công',
        description: 'Đã thêm bệnh nhân mới',
      });
      
      setOpen(false);
      form.reset();
      onPatientAdded?.(finalData);
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message || 'Không thể thêm bệnh nhân',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Thêm bệnh nhân
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Thêm bệnh nhân mới</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="ho_ten"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nguyễn Văn A" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="ngay_sinh"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày sinh</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="can_nang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cân nặng (kg)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="15.5" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dia_chi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="123 Đường ABC, Quận 1, TP.HCM" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="so_dien_thoai"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="0912345678" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? 'Đang lưu...' : 'Lưu'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}