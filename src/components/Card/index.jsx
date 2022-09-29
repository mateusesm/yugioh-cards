export const Card = ({ id, image }) => {
    return (
        <div key={id} className="card">
            <img src={image}/>
        </div>
    )

}