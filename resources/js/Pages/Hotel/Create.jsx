import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";
import {useState} from "react";
import {useForm} from "@inertiajs/react";

export default function Create(props){

    const user=props.auth.user;

    const {data, setData, post, errors, isDirty, setError, clearErrors}=useForm({
        hotel_name: '',
        price: '',
        duration: '',
        picture:null,
        country_id: null
    });

    const [isDirtyField, setDirtyField]=useState({
        hotel_name: false,
        price: false,
        picture:false,
        duration: false,
        country_id: false
    });

    const [sent, setSent]=useState(false);

    const validate=()=> {
        if (isDirtyField.hotel_name) {
            if (data.hotel_name) {
                clearErrors("hotel_name");
            } else {
                setError("hotel_name", 'Viešbučio pavadinimas yra privalomas')
            }
        }
    }


    const handleChange=(event)=>{
        data [event.target.id]=event.target.value;
        validate();
        setData({
            ...data,
            [event.target.id]:event.target.value
        });
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        post( route("hotel.store"));
        setSent(true);
    }

    const handleBlur=(event)=>{
        isDirtyField[event.target.id]=true;
        setDirtyField({
            ...isDirtyField,
            [event.target.id]:true
        });
        validate();
    }

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
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
                                <input className={"form-control" + (errors.hotel_name!=null?" is-invalid " :"")} type="text" id="hotel_name" onChange={handleChange} onBlur={handleBlur} value={data.hotel_name} />
                                <div className="invalid-feedback">
                                    { errors. hotel_name}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Kaina</label>
                                <input className={"form-control" + (errors.price!=null?" is-invalid " :"")} type="text" id="price" onChange={handleChange} onBlur={handleBlur} value={data.price} />
                                <div className="invalid-feedback">
                                    { errors. price}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Trukmė</label>
                                <input className={"form-control" + (errors.duration!=null?" is-invalid " :"")} type="text" id="duration" onChange={handleChange} onBlur={handleBlur} value={data.duration} />
                                <div className="invalid-feedback">
                                    { errors. duration}
                                </div>
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
                                <select id="country_id" className={"form-control" + (errors.country_id!=null?" is-invalid " :"")} onChange={handleChange} onBlur={handleBlur} value={data.country_id}>
                                    <div className="invalid-feedback">
                                        { errors. country_id}
                                    </div>
                                    {countryList}
                                </select>
                            </div>
                            <button className="btn btn-success">Pridėti</button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
