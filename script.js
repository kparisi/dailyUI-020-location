let locationButton = document.getElementById("get-location");
let locationDiv = document.getElementById("location-details");

locationButton.addEventListener("click", () => {
    //Geolocation APU is used to get geographical position of a user and is available
if (navigator.geolocation){
    //returns position(latitude and longitude or error)
    navigator.geolocation.getCurrentPosition(showLocation, checkError);
} 
    else{
        // For old browsers i.e. IE
        locationButton.dispatchEvent.innerText ="The browser does not support geolocation";
    }
}
);

// Error Checks
const checkError = (error) => {
    switch(error.code){
        case error.PERMISSION_DENIED:
            locationDiv.innerText = "Please allow access to location";
            break;
            case error.POSITION_UNAVAILABLE: 
            //usually fired for firefox
            locationDiv.innerText = "Location Information unavailable";
            break;
        case error.TIMEOUT:
            locationDiv.innerText = "The request to get user locations timed out";
    
    }
};

const showLocation = async(position) => {
    // We user the NOminatim API for getting actual address from latitude and longitude
    let response = await fetch('https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json'
    );
    let data = await response.json();
    console.log(data.address.city);
    console.log(data.address.county);
    locationDiv.innerText = '${data.address.city}, ${data.address.country}'
};