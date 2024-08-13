export default function ImageContainer({link,name}){
    return(
      <div>
      <div class="overlay">
        <p>{name}</p>
      </div>
      <img
        src={`${link}`}/>
    </div>
    )
}