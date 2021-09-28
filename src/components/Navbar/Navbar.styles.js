import styled from "styled-components";

export const WrapNavbar = styled.div`
	padding: 0 3.5rem;
	height: 8rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: var(--white-color);
	box-shadow: 0px 10px 30px 0px rgb(82 63 105 / 8%);
`;

export const NavbarLeft = styled.div`
	.title-admin {
		font-size: 1.9rem;
		font-weight: 500;
	}
`;

export const NavbarRight = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

export const NavbarSearch = styled.div`
	position: relative;

	.main-search {
		border: none;
		padding: 1.3rem 4.5rem 1.3rem 2rem;
		border-radius: 5px;
		background-color: var(--gray1-color);
	}

	.icon-search {
		position: absolute;
		display: flex;
		align-items: center;
		height: 70%;
		top: 50%;
		transform: translateY(-50%);
		right: 5px;
		padding: 1rem 0.6rem;
		background-color: var(--blue-color);
		color: var(--white-color);
		font-size: 1.8rem;
		border-radius: 5px;
		cursor: pointer;
	}

	.icon-search:hover {
		background-color: var(--blue-bold-color);
	}
`;

export const NavbarAction = styled.div`
	margin-left: 7rem;
	display: flex;
	align-items: center;
`;

export const NavNotification = styled.div`
	position: relative;

	.icon-notification {
		color: var(--txt-color);
		font-size: 2.5rem;
	}

	.total-notification {
		position: absolute;
		top: -6px;
		right: -8px;
		background-color: var(--red-color);
		color: var(--white-color);
		width: 2rem;
		height: 2rem;
		border-radius: 100%;
		font-size: 1.5rem;
		text-align: center;
		line-height: 2rem;
	}
`;

export const NavControl = styled.div`
	margin-left: 4rem;
	position: relative;

	.box-control {
		display: flex;
		align-items: center;
		font-size: 1.4rem;
		font-weight: 500;
	}

	.avatar-user {
		width: 4rem;
		height: 4rem;
		border-radius: 5px;
		margin-right: 2rem;
	}

	.icon-drop {
		font-size: 1.4rem;
		margin-left: 4rem;
		transform: rotate(-135deg);
		cursor: pointer;
	}
`;

export const ListAction = styled.ul`
	position: absolute;
	bottom: -250%;
	right: 0;
	width: 100%;
	padding: 1rem;
	background-color: var(--white-color);
	box-shadow: 0 0 1rem var(--gray1-color);
	border-radius: 5px;
	transition: ease-in 0.3s;
	opacity: 0;
	visibility: hidden;

	&.active {
		bottom: -180%;
		opacity: 1;
		visibility: visible;
	}

	.item-action + .item-action {
		margin-top: 1rem;
	}

	.link-action {
		display: flex;
		align-items: center;
		font-size: 1.4rem;
		color: var(--txt-color);
		padding: 1rem;
		border-radius: 5px;
		transition: ease 0.3s;
	}

	.link-action:hover {
		background-color: var(--gray1-color);
	}

	.icon-action {
		margin-right: 1.5rem;
	}
`;