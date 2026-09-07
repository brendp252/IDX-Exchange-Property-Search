import './PropertyMap.css';

export default function PropertyMap({ property }) {
    const latitude = property.LMD_MP_Latitude;
    const longitude = property.LMD_MP_Longitude;

    return (
        <div className='property-map'>
            {latitude && longitude && (
                <div>
                    <iframe
                        title="Property Location"
                        src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
                        width="800"
                        height="400"
                        loading="lazy"
                        allowFullScreen
                    />

                    <p>
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Get Directions
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
}