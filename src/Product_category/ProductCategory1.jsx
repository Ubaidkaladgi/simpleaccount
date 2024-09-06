

import { getProductCategoryDetails } from "./Action";
import React, { useEffect, useState } from "react";
import { Table} from "antd";

export const ProductCategory1 = ()=> {
    const [productCategoryList, setProductCategoryList] = useState([]);


    const fetchproductCategory = async () => {
        try {
          const res = await getProductCategoryDetails();
          const productCategoryList = res.data;
          setProductCategoryList(productCategoryList);
          console.log(productCategoryList[0]);
        } catch (error) {
          console.error("Error fetching contact data:", error);
        }
      };

    useEffect(() => {
        fetchproductCategory();
      }, []);

    const columns = [
        {
          title: "Product Category Name",
          dataIndex: "firstName",
          // sorter: true,
          width: "20%",
          filters: Array.from(
            new Set(productCategoryList.map((productCategory) => productCategory.firstName))
          ).map((name) => ({ text: name, value: name })),
          onFilter: (value, record) => record.firstName.startsWith(value),
          filterSearch: true,
        },
        {
            title: "Product Category Code",
            dataIndex: "prCode",
            // sorter: true,
            width: "20%",
            filters: Array.from(
              new Set(productCategoryList.map((productCategoryCode) => productCategoryCode.prCode))
            ).map((name) => ({ text: name, value: name })),
            onFilter: (value, record) => record.prCode.startsWith(value),
            filterSearch: true,
          },
        
      ];


  return (
    <div>
      <div
        style={{
          color: "#2064d8",
          marginRight: "85%",
          fontWeight: "500",
          fontSize: "135%",
          marginTop: "25px auto",
        }}
      >
      </div>
      <div>
        <hr></hr>
        
        <div style={{marginRight: '1%'}}>
          <Table columns={columns} dataSource={productCategoryList}  />
        </div>
      </div>
    </div>
  )
};
