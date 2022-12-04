import { ListResult, Record } from "pocketbase";
import _ from 'lodash'
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Client, getFileDownloadPath, WebAppUrl } from "../utils";

function Uploadpage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [record, setRecord] = useState<Record>();
  const [allFiles, setAllFiles] = useState<ListResult<Record>>();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    const formData = new FormData();
    if (file !== undefined) {
      formData.append("file", file);
      const res = await Client.collection("test").create(formData);
      setRecord(res);
      console.log(res);
    } else {
      alert("please select a file");
    }
  };

  useEffect(() => {
    Client.collection("test")
      .getList(1,2)
      .then((records) => {
        setAllFiles(records);
      });
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input className="upload" ref={fileRef} type="file" />
        <input type="submit" value="upload" />
      </form>{
      !!record &&(
        <a href={`${WebAppUrl}/${record.id}`}>download</a>
      )}
      
      <hr />

       <ul>
        {allFiles &&
          _.map(allFiles.items, (fileRecord) => {
            return (
              <li>
                <a href={getFileDownloadPath(fileRecord)} download={true}>
                  Download The File {fileRecord.file}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Uploadpage;
