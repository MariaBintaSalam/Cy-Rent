import PhotoCard from "../Card/PhotoCard";

export default function TopUsers() {
  return (
    <div>
      <div className="text-center text-3xl py-10">
          <h1>Top 10 Users</h1>
        </div>
      <div className="py-5 px-2">
      {Array.from({ length: 1 }, (_, index) => (
          <PhotoCard key={index} />
        ))}
    </div>
    </div>
    
  )
}
