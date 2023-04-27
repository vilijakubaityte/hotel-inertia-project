import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";
import {useState} from "react";

export default function Index(props){
    const user=props.auth.user;

    const editHotels=props.can.editHotels;

    const order=props.order;

    const hotelList = [];

    const [filter, setFilter]=useState({
        hotel_name:props.filter.hotel_name,
        country_id:props.filter.country_id
    });

    const handleDelete=(event)=>{
        router.delete(route("hotel.destroy", event.target.value));
    }

    const handleChange=(event)=>{
        setFilter({
            ...filter,
            [event.target.id]:event.target.value
        });
    }

    const handleFilter=()=>{
        router.post( route("hotel.filter"), filter);
    }

    const handleClear = () => {
        setFilter({
            hotel_name: '',
            country_id: ''
        });
        handleFilter();
    };

    const contains=(userId,users)=>{
        let result=false;
        users.forEach( (user)=>{
            if (user.id==userId){
                result = true;
            }
        })
        return result;
    }


    props.hotels.forEach((hotel)=> {
        hotelList.push
        (<tr key={hotel.id}>
            <td>
                {hotel.picture && <img width="150px" src={'/storage/hotel/'+hotel.picture} />}
                {/*<img src={hotel.picture} alt="Viešbučio nuotrauka" style={{maxWidth: "150px", maxHeight: "150px"}} />*/}
            </td>
            <td>{hotel.hotel_name}</td>
            <td>{hotel.price}</td>
            <td>{hotel.duration}</td>
            <td>{hotel.country.name}</td>
            <td>{hotel.users.map((user) => (
                <span key={user.id}>{user.name} </span>
            ))}</td>
            <td className="text-center">
                {
                    user.type !== 1 && contains(user.id, hotel.users) && (
                        <Link className="btn btn-secondary" href={route('hotel.attend', [hotel.id, (user!=null?user:'')])}>Atšaukti</Link>
                    )}
                {
                    user.type !== 1 && !contains(user.id, hotel.users) && (
                        <Link className="btn btn-secondary" href={route('hotel.attend', [hotel.id, (user!=null?user:'')])}>Pasirinkti</Link>
                    )}
            </td>
            <td className="text-center">
                {editHotels && <Link className="btn btn-primary" href={route("hotel.edit", hotel.id)}>Redaguoti</Link>}
            </td>
            <td className="text-center">
                {editHotels && <button className="btn btn-danger" onClick={handleDelete} value={hotel.id}>Ištrinti</button>}
            </td>
        </tr>)

    });

    const countryList= [];
    countryList.push(<option key={0} value="">-</option>);
    props.country.forEach((country)=>{
        countryList.push(<option key={country.id} value={country.id}>{country.name}</option>)
    });


    return (

        <AppLayout
            user={user}>
            <div className="col-md-12 col-sm-10 mt-5">
                <div className="card">
                    <div className="card-header text-center fs-3">Viešbučių sąrašas</div>
                    <div className="card-body">
                        {user.type !== 1 ? (
                        <div className="col-md-4">
                                    <>
                            Ieškoti pagal viešbutį:
                            <input id="hotel_name" className="form-control" type="text" value={filter.hotel_name} onChange={handleChange}/>
                            Ieškoti pagal šalį:
                            <select id="country_id" className="form-select" value={filter.country_id} onChange={handleChange}>
                                {countryList}
                            </select>
                        <button className="btn btn-success mt-3 px-5 text-center" onClick={handleFilter}>Filtruoti</button>
                        &nbsp;
                        <button className="btn btn-secondary mt-3 px-5 text-center" onClick={handleClear}>Išvalyti paiešką</button>
                                </>
                            </div>
                                )
                                : null }


                        {editHotels && <Link className="btn btn-success float-end mb-4" href={ route("hotel.create") }>Pridėti naują viešbutį</Link>}
                            <table className="table my-4">
                            <thead>
                            <th>Nuotrauka</th>

                            <th>
                                {user.type !== 1 ? (
                                    <Link href={route("hotel.order", ["hotel_name", order.field=="hotel_name" && order.dir=="ASC"?"DESC":"ASC"] )}>Viešbutis</Link>
                                ) : (
                                    "Viešbutis"
                                )}
                            </th>
                            <th>
                                {user.type !== 1 ? (
                                <Link href={route("hotel.order", ["price", order.field=="price" && order.dir=="ASC"?"DESC":"ASC"] )}>Kaina</Link>
                                ) : (
                                    "Kaina"
                                )}
                                </th>

                            <th>Trukmė</th>
                            <th>Šalis</th>
                            <th>Pasirinkę kelionę</th>
                            <th colSpan="3" className="text-center">Veiksmai</th>
                            </thead>
                            <tbody>
                            {hotelList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



        </AppLayout>
    )

}
