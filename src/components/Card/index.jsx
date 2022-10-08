export const Card = ({ id, image }) => {
    return (
        <div id={id} className="card">
            <img src={image}/>
        </div>
    )

}