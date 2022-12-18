import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { onClickAllCheckBoxes, onClickSelectBox, TData } from '../redux/slice/fetchSlice';

const TableComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { documents } = useAppSelector((state: RootState) => state.fetchSlice);

  type DataIndex = keyof TData;

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<TData> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}>
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}>
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}>
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<TData> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      ...getColumnSearchProps('status'),
    },
    {
      title: 'Sum',
      dataIndex: 'sum',
      key: 'sum',
      width: '10%',
      sorter: (a, b) => a.sum - b.sum,
      ...getColumnSearchProps('sum'),
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
      width: '10%',
      sorter: (a, b) => a.qty - b.qty,
      ...getColumnSearchProps('qty'),
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      key: 'volume',
      width: '10%',
      sorter: (a, b) => a.volume - b.volume,
      ...getColumnSearchProps('volume'),
    },
    {
      title: 'currency',
      dataIndex: 'currency',
      key: 'currency',
      width: '10%',
      ...getColumnSearchProps('currency'),
    },
    {
      title: 'Delivery_date',
      dataIndex: 'delivery_date',
      key: 'delivery_date',
      width: '10%',
      ...getColumnSearchProps('delivery_date'),
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        return Date.parse(a.delivery_date) - Date.parse(b.delivery_date);
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Total',
      dataIndex: 'Total',
      key: 'Total',
      width: '20%',
      sorter: (a, b) => a.sum * a.qty - b.sum * b.qty,
      render: (_, { sum, qty, currency }) => (
        <>
          {sum * qty} {currency}
        </>
      ),
    },
  ];

  let qty: number = 0;
  let volume: number = 0;

  documents.forEach((arr) => (qty += arr.qty));
  documents.forEach((arr) => (volume += arr.volume));

  return (
    <>
      <Table
        columns={columns}
        dataSource={documents}
        pagination={false}
        rowSelection={{
          type: 'checkbox',
          onSelect: (record) => {
            dispatch(onClickSelectBox(record.id));
          },
          onSelectAll: (record) => {
            dispatch(onClickAllCheckBoxes(record));
          },
        }}
        footer={() => <div>{`Общее кол-во: ${qty},  общий объём: ${volume}`}</div>}
        bordered
      />
    </>
  );
};

export default TableComponent;
