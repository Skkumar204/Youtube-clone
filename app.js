let api_key = "AIzaSyC_MZgEF2cMysoEql5uUWqz1fDNfXZctMU";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

const show = document.querySelector('.videocontainer');

fetch(video_http+ new URLSearchParams({
    key:api_key,
    part:'snippet',
    chart:'mostPopular',
    maxResults:48,
    regionCode:'IN'
}))
.then(res => res.json())
.then(data => {

    // console.log(data)

    data.items.forEach(element => {
        getChannel(element);
    });
})
.catch(err => console.log(err));


const getChannel = (video_data)=> {
    fetch(channel_http + new URLSearchParams({
        key:api_key,
        part:'snippet',
        id : video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
      video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
      makevideo(video_data);
    })
}

const makevideo =(data)=>{

    show.innerHTML+= 
    `<div class="video">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
    
        <div class="content">
            <img src="${data.channelThumbnail}" alt="" class="logo">
                <div class="info">
                    <h4 class="title">${data.snippet.title}</h4>
                    <p class="channel-name" ${data.snippet.channelTitle}></p>
                </div>
        </div>
    </div>`
}

const searchinput = document.querySelector('.search-box')
const searchbtn = document.querySelector('.search-btn')


let searchlnk = "https://www.youtube.com/results?search_query="

searchbtn.addEventListener('click',()=>{
    
    if(searchinput.value.length)
    {
        location.href=searchlnk+searchinput.value;
    }

})
