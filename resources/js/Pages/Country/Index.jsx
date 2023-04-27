import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";

export default function Index(props){

    const user=props.auth.user;
    const editHotels=props.can.editHotels;

    const countryList = [];

    const handleDelete=(event)=>{
        router.delete(route("country.destroy", event.target.value));
    }

    props.countries.forEach((country)=> {
        countryList.push
        (<tr key={country.id}>
            <td>{country.name}</td>
            <td>{country.season}</td>
            <td className="text-center">
                {editHotels && <Link className="btn btn-primary" href={route("country.edit", country.id)}>Redaguoti</Link>}
            </td>
            <td className="text-center">
                {editHotels && <button className="btn btn-danger" onClick={handleDelete} value={country.id}>Ištrinti</button>}
            </td>
        </tr>)

    });


    return (

        <AppLayout
            user={user}>
            <div className="col-md-8 mt-5">
                <div className="card">
                    <div className="card-header text-center fs-3">Šalių sąrašas</div>
                    <div className="card-body">
                        {editHotels && <Link className="btn btn-success float-end mb-4" href={ route("country.create") }>Pridėti šalį</Link>}
                        <table className="table">
                            <thead>
                            <th>Šalies pavadinimas</th>
                            <th>Sezonas</th>
                            { user.type === 1 &&
                                <th colSpan="2" className="text-center">Veiksmai</th>
                            }

                            </thead>
                            <tbody>
                            {countryList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



        </AppLayout>
    )

}
