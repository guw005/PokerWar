import { connect } from 'react-redux';
import { fetchPlayers, patchPlayer } from '../../actions/player_actions';
import Game from './game';

const mapStateToProps = (state) => {
    return {
        players: Object.values(state.players),
        ultron: state.players['61f5b235bcf670f1c241b719'],
        vision: state.players["61f5b235bcf670f1c241b718"],
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPlayers: () => dispatch(fetchPlayers()),
        patchPlayer: (id, userInfo) => dispatch(patchPlayer(id, userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);