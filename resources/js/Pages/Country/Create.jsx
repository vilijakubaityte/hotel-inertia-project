import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";
import {useState} from "react";
import {useForm} from "@inertiajs/react";

export default function Create(props){

    const user=props.auth.user;

    const {data, setData, post, errors, isDirty, setError, clearErrors}=useForm({
        name: '',
        season: ''
    });

    const [isDirtyField, setDirtyField]=useState({
        name: false,
        season: false,
    });

    const [sent, setSent]=useState(false);

    const validate=()=> {
        if (isDirtyField.name) {
            if (data.name.length >= 3 && data.name.length <= 24) {
                clearErrors("name");
            } else {
                setError("name", 'Šalies pavadinimas yra privalomas ir turi būti ne mažiau kaip 3 ir ne daugiau kaip 24 simboliai',)
            }
        }
        if (isDirtyField.season) {
            if (data.season) {
                clearErrors("season");
            } else {
                setError("season", 'Sezonas įvedimas yra privalomas')
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
        post( route("country.store"));
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


    return (
        <AppLayout
            user={user}>
            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">Redaguoti</div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Šalis</label>
                                <input className={"form-control" + (errors.name!=null?" is-invalid " :"")} type="text" id="name" onChange={handleChange} onBlur={handleBlur} value={data.name} />
                                <div className="invalid-feedback">
                                    { errors. name}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Sezonas</label>
                                <input className={"form-control" + (errors.season!=null?" is-invalid " :"")} type="text" id="season" onChange={handleChange} onBlur={handleBlur} value={data.season} />
                                <div className="invalid-feedback">
                                    { errors. season}
                                </div>
                            </div>
                            <button className="btn btn-success">Pridėti</button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
