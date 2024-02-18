import NotFound from "../assets/404NotFound.svg"
const NotFoundPage = () => {
  return (
    <div className="flex justify-center">
      <img className="h-[100vh]" src={NotFound}/>
    </div>
  )
}

export default NotFoundPage
