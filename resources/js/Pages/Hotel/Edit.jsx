import AppLayout from "@/Layouts/AppLayout";
import {Link, router, useForm} from "@inertiajs/react";
import {useState} from "react";


export default function Edit(props){
    const user=props.auth.user;


    const {data, setData, put, post}=useForm(props.hotel)

    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value
        });
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        router.post(route("hotel.update", data.id), {
            ...data,
            _method: 'put',
        });
        //router.put( route("hotel.update", values.id), values );
    }


    const countryList= [];
    countryList.push(<option key={0} value="">-</option>);
    props.country.forEach((country)=>{
        countryList.push(<option key={country.id} value={country.id}>{country.name}</option>)
    });



    return (
        <AppLayout
            user={user}>
            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">Redaguoti</div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Viešbutis</label>
                                <input className="form-control" type="text" id="hotel_name" onChange={handleChange} value={data.hotel_name} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Kaina</label>
                                <input className="form-control" type="text" id="price" onChange={handleChange} value={data.price} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Trukmė</label>
                                <input className="form-control" type="text" id="duration" onChange={handleChange} value={data.duration} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nuotrauka</label>
                                <input type="file" id="picture" className="form-control" onChange={(event)=>{
                                    setData({
                                        ...data,
                                        picture:event.target.files[0]
                                    });
                                }} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Šalis</label>
                                <select id="country_id" className="form-select" onChange={handleChange} value={data.country_id}>
                                    {countryList}
                                </select>
                            </div>
                            <button className="btn btn-success">Atnaujinti</button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
