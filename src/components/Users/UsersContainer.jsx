import React from 'react';
import {connect} from 'react-redux';
import * as axios from 'axios';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {follow, setCurrentPage, setTotalUsersCount, setUsers, toggleIsFetching, unFollow} from '../../redux/users-reducer';

class UsersContainer extends React.Component {
    
    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount);
        });
    }
    
    onPageChanged = (pageNumber) => {
        this.props.toggleIsFetching(true);
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(response.data.items);
        });
    };
    
    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   follow={this.props.follow}
                   unFollow={this.props.unFollow}
                   onPageChanged={this.onPageChanged}
            />;
        </>;
    }
}

let mapStateToProps = (state) => {
    return {
        users          : state.usersPage.users,
        pageSize       : state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage    : state.usersPage.currentPage,
        isFetching     : state.usersPage.isFetching
    };
};

// let mapDispatchToProps = (dispatch) => {
//     return {
//         setUsers          : (users) => {
//             dispatch(setUsersAC(users));
//         },
//         follow            : (userId) => {
//             dispatch(followAC(userId));
//         },
//         unFollow          : (userId) => {
//             dispatch(unFollowAC(userId));
//         },
//         setCurrentPage    : (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber));
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount));
//         },
//         toggleIsFetching  : (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching));
//         }
//     };
// };

export default connect(mapStateToProps, {
    setUsers, follow, unFollow, setCurrentPage,
    setTotalUsersCount, toggleIsFetching
})(UsersContainer);