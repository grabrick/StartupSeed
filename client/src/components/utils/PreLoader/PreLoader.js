import { InfinitySpin } from "react-loader-spinner";

function PreLoader({color, h, w}) {
    return <InfinitySpin height={h} width={w} color={color} ariaLabel="loading" />
}

export default PreLoader;