export function OwnerDashboard() {

 const initialState={
  name:'',
  cuisine:'',
  area:'',
  isVeg:false,
  long:'',
  lat:'',
  description:'',
  openingHour:'',
  phone:''
 }

 type State=typeof initialState
 type Action=
              |  {type:"UPDATE_FIELD";field:keyof State;value:string}
              |  { type: 'RESET' }

  return <div>Owner Dashboard (coming soon)</div>
}