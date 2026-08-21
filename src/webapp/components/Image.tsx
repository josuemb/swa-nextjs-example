import NextImage from "next/image";
import { ImageProps } from "next/image";

// Custom Image component with unoptimized prop for static export.
// See: https://nextjs.org/docs/app/api-reference/components/image#unoptimized

const Image = (imageProps: ImageProps) => {
    return (
        <NextImage
            {...imageProps}
            unoptimized
        />
    )
};

export default Image
