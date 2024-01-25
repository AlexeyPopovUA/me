import LightboxComponent, {
    LightboxExternalProps,
} from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

/**
 * The purpose of this intermediate component is to load the Lightbox and
 * its CSS dynamically only when the lightbox becomes interactive
 */
const Lightbox = (props: LightboxExternalProps) => {
    const processedProps = {...props};

    const isOnlyOneSlide = (props.slides?.length ?? 0) === 1;

    if (!processedProps.carousel) {
        processedProps.carousel = {};
    }

    if (typeof processedProps.carousel?.finite !== "boolean") {
        processedProps.carousel.finite = isOnlyOneSlide;
    }

    if (!isOnlyOneSlide) {
        return <LightboxComponent plugins={[Thumbnails]} {...processedProps} />;
    }

    return <LightboxComponent plugins={[]} {...processedProps} />;
}

export default Lightbox;
