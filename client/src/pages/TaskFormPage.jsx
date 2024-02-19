import {useEffect} from "react"
import {useForm} from "react-hook-form";
import { createTask, deleteTask, updateTask,getTask } from "../api/tasks.api";
import {useNavigate, useParams} from "react-router-dom";
import React from "react";
import {toast} from "react-hot-toast"

export function TaskFormPage(){

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm();
    const navigate = useNavigate()
    const params = useParams()

    const onSubmit = handleSubmit (async data => {
        if (params.id) {
            await updateTask(params.id, data)
            toast.success ("Tarea Actualizada", {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        }else {
            await createTask (data);
            toast.success ("Tarea Creada", {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        }
        navigate ("/tasks");
    });

    useEffect (() => {
    async function loadTask (){
        if (params.id){
            const {
                data: {title, description, cod_user, name_user, observations},
            } = await getTask(params.id);
            setValue("title", title);
            setValue("description", description);
            setValue("cod_user", cod_user);
            setValue("name_user", name_user);
            setValue("observations", observations);
        }
    }
    loadTask();
    }, []);
    
    return (
        <div className=" max-w-xl mx-auto">
            <form onSubmit={onSubmit}>
                <input 
                    type="text"
                    placeholder="Titulo"
                    {...register("title", {required: true})}
                    className=" bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                />
                {errors.title && <span>Este campo es requerido</span>}

                <input 
                    type="text"
                    placeholder="Descripcion"
                    {...register("description", {required: true})}
                    className=" bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                />
                {errors.description && <span>Este campo es requerido</span>}

                <input 
                    type="text"
                    placeholder="Codigo de Usuario"
                    {...register("cod_user", {required: true})}
                    className=" bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                />
                {errors.cod_user && <span>Este campo es requerido</span>}

                <input 
                    type="text"
                    placeholder="Nombre de Usuario"
                    {...register("name_user", {required: true})}
                    className=" bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                />
                {errors.name_user && <span>Este campo es requerido</span>}

                <textarea
                    rows="3" 
                    placeholder="Observaciones"
                    {...register("observations", {required: true})}
                    className=" bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                ></textarea>
                {errors.observations && <span>Este campo es requerido</span>}

                <button className=" bg-indigo-500 p-3 rounded-lg block w-full mt-3"
                >Save</button>
            </form>

            {params.id && (
            <div className=" flex justify-end">
                <button
                className=" bg-red-500 p-3 rounded-lg w-48 mt-3"
                    onClick={async () => {
                        const accepted = window.confirm("¿Está seguro que desea eliminar?");
                        if (accepted) {
                            await deleteTask (params.id);
                            toast.success ("Tarea Eliminada", {
                                position: "bottom-right",
                                style: {
                                    background: "#101010",
                                    color: "#fff"
                                }
                            });
                            navigate("/tasks");
                        }
                    }}
                >
                    Delete
                </button>
            </div>
            )}
        </div>
    );
}