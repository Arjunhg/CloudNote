import React from "react";

const DeleteConfirm = ({handleDelete, handleClose})=>{
    return(
        <div>
             <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Are you sure you want to permanentaly delete this note?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleDelete} type="button" className="btn btn-primary">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DeleteConfirm;


{/* <p>Are you sure you want to delete this note permanentaly</p>
<button onClick={handleDelete}>Yes</button>
<button onClick={handleClose}>No</button> */}

{/* <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>

            <Modal.body>
                <p>Are you sure you want to delete this note permanentaly?</p>
            </Modal.body>
            <Modal.Footer>
                <button onClick={handleDelete}>Yes</button>
                <button onClick={handleClose}>No</button>
            </Modal.Footer>
        </Modal>
         */}