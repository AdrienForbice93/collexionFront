import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ICollection } from '../../types/types';

export default function SingleCollectionEdit() {
  const data: ICollection = useLoaderData() ?? '';
  return (
    <form className="md:w-1/2 mx-auto">
      <h1 className="text-3xl mb-6">{data ? 'Editer la' : 'Créer une'} collection</h1>
      <label className="form-control w-full" htmlFor='collection-name'>
        <div className="label">
          <span className="label-text">Nom de la collection</span>
        </div>
        <input
          id="collection-name"
          type="text"
          placeholder={data.name ? data.name : "Nom de la collection"}
          className="input input-bordered w-full"
        />
      </label>
      <label className="form-control w-full" htmlFor="collection-description">
        <div className="label">
          <span className="label-text">Description de la collection</span>
        </div>
        <textarea
          id="collection-description"
          className="textarea textarea-bordered h-24"
          placeholder={data.description ? data.description : "Description de la collection"}
        ></textarea>
      </label>
      <label className="form-control w-full" htmlFor="collection-image">
        <div className="label">
          <span className="label-text">Image de la collection</span>
        </div>
        <input
          id="collection-image"
          type="file"
          className="file-input file-input-bordered file-input-neutral w-full"
        />
      </label>
      { data && <h2 className="text-xl my-6">Objets rattachés</h2>}
      { data &&
      [...Array(15)].map((_, index) => (
        <div key={index} className="flex shadow-lg place-items-center rounded-lg overflow-hidden border mb-4">
          <img src="https://picsum.photos/200" className="max-w-16 mr-4 object-fill" />
          <p className="block flex-1">Object avec un nom super long pour tester</p>
          <button
            className="btn rounded-none h-16"
            onClick={(evt) => {
              evt.preventDefault();
              console.log('supprimé');
            }}
          >
            <svg
              className="w-6 h-6 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))
      }
      <button
        type="button"
        className="text-white bg-gradient-to-r from-customred to-customorange hover:bg-gradient-to-br font-semibold rounded-lg text-base px-3 py-2 text-center my-4 mx-auto"
      >
        Mettre à jour
      </button>
    </form>
  );
}