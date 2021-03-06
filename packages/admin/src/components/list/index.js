import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'

import getListGql from './gql/getList.gql'
import AlertError from '../alert/error'
import TopInfoBlock from './topInfo'
import ListLoading from './loading'
import Item from './item'

const ListWrapper = styled.div`
    width: 95%;
    margin: 3px auto;
    display: block;
    position: relative;
`

const ListItems = ({ setActiveId, activeId, removedId }) => {
    const { loading, error, data, variables, refetch } = useQuery(getListGql, {
        variables: {
            count: 40,
            offset: 0,
        },
        fetchPolicy: 'cache-and-network',
    })

    useEffect(() => {
        if (!removedId || error || loading) return
        refetch(variables)
    }, [removedId])

    if (loading) return <ListLoading />
    if (error || !data) return <AlertError txt={(error && error.message) || 'Empty result'} />

    const {
        listWebcams: { count, allCount, list },
    } = data

    return (
        <ListWrapper>
            <TopInfoBlock count={count} allCount={allCount} />
            {list.map(({ id, title }) => (
                <Item
                    key={id}
                    id={id}
                    title={title}
                    active={id === activeId}
                    setActiveId={setActiveId}
                />
            ))}
        </ListWrapper>
    )
}

export default ListItems
