import { FC } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ImagePlus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
    imagePreviews: string[];
    onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: (index: number) => void;
    title: string;
    multiple?: boolean;
    grid?: string
}

const ImageUpload: FC<ImageUploadProps> = ({
    imagePreviews,
    onRemove,
    onUpload,
    title,
    grid,
    multiple = false,
}) => {
    return (
        <div className="w-full space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="space-y-2">
                <h3 className="text-lg font-sm">{title}</h3>
                <p className="text-sm text-muted-foreground">
                    Supported formats: JPG, PNG, GIF, JPEG
                </p>
            </div>

            <Input
                type="file"
                accept="image/*"
                className="hidden"
                multiple={multiple}
                onChange={onUpload}
                id="fileInput"
            />

            {multiple ? (
                <div className={cn("grid gap-4", grid)}>
                    <label htmlFor="fileInput" className="col-span-1">
                        <div className="flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 transition-colors hover:bg-muted/50">
                            <div className="rounded-full bg-background p-2 shadow-sm">
                                <ImagePlus className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <p className="text-xs text-muted-foreground">Add Image</p>
                        </div>
                    </label>

                    {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative col-span-1">
                            <div className="group relative h-32 w-full overflow-hidden rounded-lg border">
                                <img
                                    src={preview}
                                    alt={`preview-${index}`}
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                                    <Button
                                        size="sm"
                                        type="button"
                                        variant="destructive"
                                        onClick={() => onRemove}
                                        className="h-7 w-7 p-0"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : imagePreviews.length === 0 ? (
                <label htmlFor="fileInput" className="block">
                    <div className="flex h-64 w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/25 transition-colors hover:bg-muted/50">
                        <div className="rounded-full bg-background p-3 shadow-sm">
                            <ImagePlus className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium">Add Image</p>
                            <p className="text-xs text-muted-foreground">
                                or drag and drop file here
                            </p>
                        </div>
                    </div>
                </label>
            ) : (
                <div className="relative w-full">
                    <div className="group relative h-64 w-full overflow-hidden rounded-lg border">
                        <img
                            src={imagePreviews[0]}
                            alt="Preview"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                            <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                onClick={() => onRemove(0)}
                                className="h-7 w-7 p-0"
                            >
                                <Trash2 className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;