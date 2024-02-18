import { useState } from "react";

/* eslint-disable react/prop-types */
const DoctorInfo = ({ setIsOpen, doctor }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const openModal = (image) => {
        setSelectedImage(image);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedImage('');
    };
    console.log("doctor info", doctor)
    return (
        <>
            <div className="overflow-y-auto overflow-x-hidden fixed   z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow-sm ">
                        <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                            onClick={() => setIsOpen(false)}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <div className=" flex flex-col items-center ">
                                <img className="w-20 h-20  rounded-lg "
                                    onClick={() => openModal(doctor.profilePic)}
                                    src={doctor.profilePic} />
                                <h2 className="text-2xl font-bold mb-4  text-gray-700 uppercase ">{`${doctor.firstName} ${doctor.lastName}`}</h2>
                                <p className=" font-bold mb-4  text-gray-700 uppercase">{doctor.address}</p>

                                {/* Certificates */}
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold mb-4  text-gray-700 uppercase">Certificates</h3>
                                    <div className="flex space-x-4 justify-center">
                                        {doctor.certificates.map((certificate, index) => (
                                            <img
                                                key={index}
                                                src={certificate} // Replace with the actual source of the image
                                                alt={`Certificate ${index + 1}`}
                                                className="w-20 h-20  rounded-lg"
                                                onClick={() => openModal(certificate)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <p className="font-semibold mb-4 text-sm  text-gray-700 uppercase">{doctor.email}</p>
                                <p className="font-semibold mb-4 text-sm text-gray-700 uppercase">{`Specialization: ${doctor.specialization}`}</p>
                                <p className="font-semibold mb-4 text-sm text-gray-700 uppercase">{`Experience: ${doctor.experience} years`}</p>
                                <p className="font-semibold mb-4 text-sm text-gray-700 uppercase">{`Fees per Consultation: Rs. ${doctor.feesPerCunsaltation}`}</p>
                                <p className="font-semibold mb-4 text-sm text-gray-700 uppercase">{`Phone: ${doctor.phone}`}</p>
                                <p className="font-semibold mb-4 text-sm text-gray-700 uppercase">{`Timings: ${doctor.timings[0]} - ${doctor.timings[1]}`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="max-w-2xl bg-white p-4 rounded-lg overflow-hidden">
                        <button
                            className="absolute top-2 right-2 text-white text-2xl cursor-pointer"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <img src={selectedImage} alt="Selected Certificate" className="w-full h-auto" />
                    </div>
                </div>
            )}
        </>
    )
}

export default DoctorInfo
