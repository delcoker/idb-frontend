import React, {useEffect, useState} from "react";
import {GridColDef} from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";
import {CustomMuiToolbar} from "../../components/toolbar/CustomMuiToobar";
import {StripedDataGrid} from "../../components/reusable/StripedDataGrid";
import {Paper} from "@mui/material";
import container from "../../../Container";
import HMLDataRepository from "../../../domain/repositories/HMLDataRepository";

const Items = () => {
    const navigate = useNavigate();
    const hmlDataRepository = container.resolve<HMLDataRepository>('HMLDataRepository');

    const [itemEditDialogOpen, setItemEditDialogOpen] = React.useState(false);
    const [allItems, setAllItems] = useState<any>([]);
    const [pageSize, setPageSize] = React.useState(100);
    const [editData, setEditData] = React.useState(null);

    useEffect(() => {
        getData()
    }, []);

    const columns: GridColDef[] = [
        {field: "id", headerName: "Id"},
        {field: "iso2", headerName: "ISO2",},
        {field: "iso3", headerName: "ISO3",},
        {field: "name", headerName: "Country", flex: 1},
        {field: "pdfUrl", headerName: "Regions", flex: 2},
    ];
    const data = {rows: allItems, columns: columns};

    const rowClickHandler = (gridData: any) => {
        setEditData(gridData.row);
    };

    const getData = () => {
        hmlDataRepository.getAlertData()
            .then((countryPDFData: any) => {

                const countries = countryPDFData.map((country: any, i: any) => {
                    console.log('country', country)
                    const id = country.country.id;
                    const name = country.country.name;
                    const iso2 = country.country.iso2;
                    const iso3 = country.country.iso3;
                    const pdfUrl = country.url.summary;
                    return {id, name, iso2, iso3, pdfUrl};
                });

                setAllItems(countries)

            })
            .catch((error: any) => {
                console.log(error)
                alert(error);
            });
    };


    const CustomToolbar = () => (
        <CustomMuiToolbar
            onAddClick={() => null}
            onEditClick={() => null}
            onDeleteClick={() => console.log("delete clicked")}
            onResetClick={() => null}
        />
    );

    return <Paper>

        <StripedDataGrid
            {...data}
            components={{Toolbar: CustomToolbar}}
            rowsPerPageOptions={[50, 100, 200]}
            pageSize={pageSize}
            onRowClick={rowClickHandler}
            onRowDoubleClick={() => setItemEditDialogOpen(true)}
            getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            onPageSizeChange={(size) => setPageSize(size)}
            sx={{
                height: '85vh',
                boxShadow: 2,
                border: 2,
                borderColor: "primary.light",
                "& .MuiDataGrid-cell:hover": {
                    color: "primary.main",
                },
            }}
            initialState={{
                columns: {
                    columnVisibilityModel: {
                        id: false
                    },
                },
            }}
            density="compact"
        />
    </Paper>
};
export default Items;
