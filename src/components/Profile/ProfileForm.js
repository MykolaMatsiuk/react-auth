import { useContext, useRef } from 'react';
import { useHistory } from 'react-router';

import { appKey } from '../../appKey';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
	const newPasswordInputRef = useRef();

	const history = useHistory();

	const { token: idToken } = useContext(AuthContext);

	const newPasswordSubmitHandler = (event) => {
		event.preventDefault();

		const enteredNewPassword = newPasswordInputRef.current.value;

		//validation

		fetch(
			`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${appKey}`,
			{
				method: 'POST',
				body: JSON.stringify({
					idToken,
					password: enteredNewPassword,
					returnSecureToken: false
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			}
		).then(() => {
			history.replace('/');
		});
	};

	return (
		<form className={classes.form} onSubmit={newPasswordSubmitHandler}>
			<div className={classes.control}>
				<label htmlFor="new-password">New Password</label>
				<input
					type="password"
					id="new-password"
					minLength="6"
					ref={newPasswordInputRef}
				/>
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	);
};

export default ProfileForm;
