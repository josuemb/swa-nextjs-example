import NextImage, { ImageLoaderProps } from "next/image";
import { ImageProps } from "next/image";

// Custom Image component adding a custom loader to allow next export command.
// See:
// https://nextjs.org/docs/api-reference/next/image#loader

const customLoader = ({ src }: ImageLoaderProps) => {
    return src
}

const Image = (imageProps: ImageProps): React.ReactNode => {
    return (
        <NextImage
            {...imageProps}
            loader={customLoader}
        />
    )
};

export default Image
