import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { fetchPropertyDetail, fetchPropertyOpenHouses } from '../api/client';
import parsePhotos from '../utils/parsePhotos';
import PropertyImageGallery from '../components/PropertyImageGallery';
import PropertyMap from '../components/PropertyMap';
import './PropertyDetailPage.css';

export default function PropertyDetailPage() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [openHouses, setOpenHouses] = useState([]);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProperty() {
            try {
                setError("");
                setIsLoading(true);
                const data = await fetchPropertyDetail(id);
                setProperty(data);
                const openHouseData = await fetchPropertyOpenHouses(id);
                setOpenHouses(openHouseData);
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setIsLoading(false);
            }
        }

        loadProperty();
    }, [id]);

    // useEffect(() => {
    //     function handleKeyDown(e) {
    //         if (e.key === "Escape") {
    //             setIsLightboxOpen(false);
    //         }
    //     }

    //     window.addEventListener("keydown", handleKeyDown);

    //     return () => {
    //         window.removeEventListener("keydown", handleKeyDown);
    //     };
    // }, []);

    function handlePhotoClick(index) {
        setIsLightboxOpen(true);
        setCurrentPhotoIndex(index);
    }

    if (!property) return <div>Loading...</div>;

    // const photos = parsePhotos(property.L_Photos);
    const price = property.L_SystemPrice.toLocaleString('en-US');
    const sqft = property.LM_Int2_3.toLocaleString('en-US');

    return (
        <>
            <h2><Link to="/">Back to Listings</Link></h2>
            
            {/* TO-DO: Figure out lightbox */}
            {/* {isLightboxOpen && (
                <img
                    className='property-detail-page__lightbox'
                    src={photos[currentPhotoIndex]}
                    alt={property.L_Address || "Property"}
                />
            )} */}

            <div className='property-detail-page'>
                <PropertyImageGallery
                    property={property}
                    currentPhotoIndex={currentPhotoIndex}
                    onPhotoClick={handlePhotoClick}
                    isLightboxOpen={isLightboxOpen}
                />
                <div className='property-detail-page__info'>
                    <div className='property-detail-page__address'>
                        {property.L_Address}, {property.L_City}, {property.L_State} {property.L_Zip}
                    </div>
                    <div className='property-detail-page__price'>
                        ${price}
                    </div>
                    <ul className='property-detail-page__features'>
                        <li>{property.L_Keyword2} beds</li>
                        <li>{property.LM_Dec_3} bathrooms</li>
                        <li>{sqft} square feet</li>
                    </ul>
                </div>
                <br></br>
                <div className='property-detail-page__additional'>
                    <h2>Additional Info</h2>
                    <div>Built in {property.YearBuilt}</div>
                    <div>{property.L_Keyword5} garage spaces</div>
                    <div>
                        Listed By: {property.LA1_UserFirstName} {property.LA1_UserLastName}
                        ({property.LO1_OrganizationName})
                    </div>
                </div>
                <br></br>
                <div className='property-detail-page__desc'>
                    <h2>About This Property</h2>
                    {property.L_Remarks}
                </div>
                <div className='property-detail-page__openhouses'>
                    <h2>Open Houses</h2>
                    {openHouses.length > 0 ? (
                        openHouses.map((openHouse, index) => {
                            let remarks = "";
                            let date = "";
                            let startTime = "";
                            let endTime = "";
                            try {
                                const parsed = JSON.parse(openHouse.all_data);
                                remarks = parsed.OpenHouseRemarks;
                                date = parsed.OpenHouseDate;
                                startTime = parsed.OpenHouseStartTime;
                                endTime = parsed.OpenHouseEndTime;
                            }
                            catch (error) {
                                remarks = "";
                                date = "";
                                startTime = "";
                                endTime = "";
                            }

                            return (
                                <div key={index}>
                                    {date && <p>{date}</p>}
                                    {startTime && <p>{startTime}</p>}
                                    {endTime && <p>{endTime}</p>}
                                    {remarks && <p>{remarks}</p>}
                                </div>
                            );
                        })
                    ) : (
                        <p>No open houses scheduled</p>
                    )}
                </div>
                <div className='property-detail-page__location'>
                    <h2>Location</h2>
                    <PropertyMap
                        property={property} 
                    />
                </div>
            </div>
        </>
    );
}