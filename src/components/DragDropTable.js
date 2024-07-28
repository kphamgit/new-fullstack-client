import React, { useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {reOrderRows, deleteQuestion, cloneQuestion}  from './services/list'

export function DragDropTable({headers, data_rows, data_type}) {
    const [dataRows, setDataRows] = useState([])
    useEffect(() => {
        setDataRows(data_rows)
    },[data_rows])
   
    // paginate(item_type, item_ids) {
    const resetItemNumbers = () => {
        const els = document.getElementsByTagName('tr')
        let index=1
        Array.from(els).forEach(function (element) {
          if(element.tagName === 'TR') {
            //element's children are either TH or TD. Exclude TH data 
            if (element.children[0].tagName !== 'TH') {
                // item ID should be the first TD child of
              console.log(element.children[0].innerHTML)
              //console.log(element.children[1])
              element.children[1].innerHTML = index
              index++
            }
         }
        });
    }

    const deleteRow = (id) => {
        //console.log("HEEEEEEE")
        deleteQuestion(id)
        .then((response) => {
            console.log(response.data)
            window.location.reload();
        })
    }

    const clone = (id) => {
        //console.log("HEEEEEEE")
        cloneQuestion(id)
        .then((response) => {
            //console.log(response.data)
            window.location.reload();
        })
    }

    const paginate = () => {
        const els = document.getElementsByTagName('tr')
        let item_ids = []
        Array.from(els).forEach(function (element) {
          //console.log("**** ", element.children[0] + "*****")
          if(element.tagName === 'TR') {
            //element's children are either TH or TD. Exclude TH data
            if (element.children[0].tagName !== 'TH') {
                // item ID should be the first TD child of
              console.log(element.children[0].innerHTML)
              item_ids.push(parseInt(element.children[0].innerHTML))
            }
         }
        });
        const item_ids_obj = {}
        item_ids.forEach((id, index) => {
            item_ids_obj[index+1] = id
        })
        reOrderRows("questions", item_ids_obj)
        .then (response => {
            //console.log(response.data)
            resetItemNumbers()
        })
        
    }

    const dragRow = useRef(0)
    const draggedOverRow = useRef(0)

    

    const handleSort = () => {
        const dataRowsClone = [...dataRows]
        const temp = dataRowsClone[dragRow.current]
        dataRowsClone[dragRow.current] = dataRowsClone[draggedOverRow.current]
        dataRowsClone[draggedOverRow.current] = temp
        setDataRows(dataRowsClone)
    }
    return (
        <div className='flex flex-col mt-5 mx-1 items-left space-y-4'>
            <button className='text-red-200 bg-orange-900 w-1/6' onClick={paginate}>Paginate</button>
            <table>
            <thead>
                <tr>
                    {headers && headers.map((heading, index) => (
                        <th>{heading}</th>
                    ))}
                </tr>
              </thead>
            <tbody>
            { dataRows && dataRows.map((row, index) => (
                <tr>
                    <td
                     key = {index} className='relative flex space-x-3 m-2 border rounded-p2 text-lg bg-gray-200'
                     draggable
                     onDragStart={() => (dragRow.current = index)}
                     onDragEnter={() => (draggedOverRow.current = index)}
                     onDragEnd={handleSort}
                     onDragOver={(e) => e.preventDefault()}
                    >{row[0]}</td> {/* constraint: row[0] must be item id*/}
                    <td>{row[1]}</td> {/* constraint: row[1] must be item number*/}
                    <td>{row[2]}</td> {/* constraint: row[2] must be item name or format for question*/}
                    <td>{row[3]}</td>
                    <td className='underline'><Link to={`/${data_type}/edit/${row[0]}`}>Edit</Link></td>
                    <td><button className='bg-green-300' onClick={() => {clone(row[0])}}>Clone</button></td>
                    <td><button className='bg-red-300'  onClick = {() => {deleteRow(row[0])}}>Delete</button></td>
                </tr>
            ))
            }
            </tbody>
            </table>
            <button className='text-red-200 bg-orange-900 w-1/6' onClick={paginate}>Paginate</button>
        </div>
    )
}
