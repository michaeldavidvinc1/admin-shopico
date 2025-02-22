import { DynamicBreadcrumb } from '@/components/DynamicBreadcrumb';
import ImageUpload from '@/components/image-upload';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ROUTES } from '@/constant';
import { CreateCategorySchema } from '@/schema';
import { useCreateCategoryMutation } from '@/services/category.service';
import { generateSlug } from '@/utils/slugify';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const CreateCategory = () => {
    const navigate = useNavigate();
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const breadcrumbItems = [
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "Category", href: ROUTES.CATEGORY },
        { label: "Create" }
    ];

    type FormData = z.infer<typeof CreateCategorySchema>;

    const form = useForm<FormData>({
        resolver: zodResolver(CreateCategorySchema),
        defaultValues: {
            name: "",
            slug: "",
            image: ""
        },
    });

    const [createCategory, {isLoading: loadingCreateCategory}] = useCreateCategoryMutation();

    const nameValue = form.watch("name");
    useEffect(() => {
        form.setValue("slug", generateSlug(nameValue));
    }, [nameValue]);

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; 
        if (!file) return;
        const imageUrl = URL.createObjectURL(file);

        setUploadedImages((prevImages) => [...prevImages, imageUrl]);
        setUploadedFiles((prevFiles) => [...prevFiles, file]);
    };

    const handleRemoveImage = (index: number) => {
        setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    async function onSubmit(values: FormData) {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("slug", values.slug);
        
        if (uploadedFiles.length > 0) {
            formData.append("image", uploadedFiles[0]); 
        }
        try {
            const res = await createCategory(formData).unwrap();
            if (res.success) {
                toast.success(res.message)
                navigate(ROUTES.CATEGORY)
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else if (typeof error === "object" && error !== null && "data" in error) {
                const apiError = error as { data: { msg: string } };
                toast.error(apiError.data.msg);
            } else {
                toast.error("An unknown error occurred");
            }
        }
    }

    return (
        <div className="space-y-6 flex flex-col">
            <div className="space-y-1">
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold tracking-tight">Create Category</h1>
                    <DynamicBreadcrumb items={breadcrumbItems} />
                </div>
            </div>
            <div>
                <Form {...form}>
                    <form
                        className="mt-4 space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                        encType="multipart/form-data"
                    >
                        <div className="grid grid-cols-5 gap-4">
                            <div className='col-span-3 flex flex-col gap-4'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <div className='col-span-2'>
                                <ImageUpload
                                    onRemove={handleRemoveImage}
                                    onUpload={handleImageUpload}
                                    title="Category Image"
                                    imagePreviews={uploadedImages}
                                />
                            </div>
                        </div>
                        <Button type='submit' disabled={loadingCreateCategory}>
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CreateCategory;
