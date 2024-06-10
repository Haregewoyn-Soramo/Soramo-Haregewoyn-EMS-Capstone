import { useGetKPIQuery } from "../state/api"




const HoursWorked = ()=>{

  const {data, isLoading} = useGetKPIQuery();
  console.log(data)
  
  return(
    <div>

    </div>
  )
}

export default HoursWorked