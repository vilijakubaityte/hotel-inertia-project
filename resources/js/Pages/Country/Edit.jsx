import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";
import {useState} from "react";

export default function Edit(props){
    const user=props.auth.user;


    const [values, setValues]=useState(props.country)

    const handleChange=(event)=>{
        setValues({
            ...values,
            [event.target.id]:event.target.value
        });
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        router.put( route("country.update", values.id), values );
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
                                <input className="form-control" type="text" id="name" onChange={handleChange} value={values.name} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Sezonas</label>
                                <input className="form-control" type="text" id="season" onChange={handleChange} value={values.season} />
                            </div>
                            <button className="btn btn-success">Atnaujinti</button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
