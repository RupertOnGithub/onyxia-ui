import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

const Catalogue = ({ catalogue: { id, name, description } }) => (
	<Grid item sm={12} lg={4} classes={{ item: 'carte' }}>
		<Card classes={{ root: 'container' }} className="carte">
			<CardHeader
				title={name}
				classes={{
					root: 'en-tete',
					title: 'titre',
				}}
			/>
			<CardContent>
				<div className="paragraphe">
					<div className="titre">Description</div>
					<div className="corps">{description}</div>
				</div>
			</CardContent>
			<CardActions classes={{ root: 'boutons' }}>
				<Link to={`/my-lab/catalogue/${id}`}>
					<IconButton color="secondary" aria-label="Explorer">
						<Icon>folder_open</Icon>
					</IconButton>
				</Link>
			</CardActions>
		</Card>
	</Grid>
);

Catalogue.propTypes = {
	catalogue: PropTypes.shape({
		id: PropTypes.string.isRequired,
	}),
};
export default Catalogue;
