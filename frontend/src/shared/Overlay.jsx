import React from 'react'
import Dialog from '../components/Dialog'

export default function Overlay({ setShowDialog, type, listUpdated, setListUpdated, setMessage, projectId, reRerenderRef }) {
    return (
        <div className='overlay'>
            <Dialog setShowDialog={setShowDialog} type={type} setListUpdated={setListUpdated} setMessage={setMessage} listUpdated={listUpdated} projectId={projectId} reRerenderRef={reRerenderRef} />
        </div>
    )
}
