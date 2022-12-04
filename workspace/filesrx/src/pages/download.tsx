import { Record } from "pocketbase";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Client, getFileDownloadPath } from "../utils";

function Download() {
const {id}=useParams();
const [record,setRecord]=useState<Record>();

useEffect(() => {
    if (id) {
      Client.collection("test")
        .getOne(id)
        .then((record) => {
          setRecord(record);
        });
    }
  }, [id]);

    return(
        <div>
            <h2>download kr le</h2>
            {
                !!record && ( <h1>
                    <a href={getFileDownloadPath(record)}>download</a>
                </h1> )
            }
        </div>
    )
}

export default Download