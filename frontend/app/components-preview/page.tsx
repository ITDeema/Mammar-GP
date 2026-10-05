"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Input from "@/components/Input";
import Modal from "@/components/Modal";

export default function ComponentsPreview() {
  const [open, setOpen] = useState(false);

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 p-8">
      <h1 className="font-heading text-3xl font-bold">القطع المشتركة</h1>

      <Card className="flex flex-wrap gap-3">
        <Button>بدء التحليل</Button>
        <Button variant="secondary">إلغاء</Button>
        <Button variant="danger">حذف</Button>
        <Button disabled>معطّل</Button>
      </Card>

      <Card className="flex flex-wrap gap-3">
        <Badge tone="success">ضمن الاشتراطات</Badge>
        <Badge tone="caution">ملاحظة</Badge>
        <Badge tone="danger">خطأ</Badge>
        <Badge>محايد</Badge>
      </Card>

      <Card className="flex flex-col gap-4">
        <Input label="البريد الإلكتروني" placeholder="you@example.com" />
        <Input label="كلمة المرور" type="password" error="كلمة المرور قصيرة" />
      </Card>

      <Button onClick={() => setOpen(true)}>افتح النافذة</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="تأكيد الحذف">
        <p className="text-stone-600">هل أنتِ متأكدة من الحذف؟</p>
        <div className="mt-6 flex gap-3">
          <Button variant="danger" onClick={() => setOpen(false)}>
            حذف
          </Button>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            إلغاء
          </Button>
        </div>
      </Modal>
    </main>
  );
}