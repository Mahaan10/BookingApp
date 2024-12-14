import { LoaderIcon } from "react-hot-toast"


function Loader() {
  return (
    <div className="flex items-center gap-4 my-4 mx-auto">
      <p>Loading Data ...</p>
      <LoaderIcon className="w-5"/>
    </div>
  )
}

export default Loader