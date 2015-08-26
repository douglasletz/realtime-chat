'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _d3 = require('d3');

var _d32 = _interopRequireDefault(_d3);

var _utilJs = require('./util.js');

var PropTypes = _react2['default'].PropTypes;

var LineChart = _react2['default'].createClass({
    displayName: 'LineChart',

    propTypes: {
        // the array of data objects
        data: PropTypes.array.isRequired,
        // accessor for X & Y coordinates
        getX: _utilJs.AccessorPropType,
        getY: _utilJs.AccessorPropType,

        xScale: PropTypes.func,
        yScale: PropTypes.func
    },

    componentWillMount: function componentWillMount() {
        this.initBisector(this.props);
    },
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        this.initBisector(newProps);
    },
    initBisector: function initBisector(props) {
        var _this = this;

        this.setState({ bisectX: _d32['default'].bisector(function (d) {
                return (0, _utilJs.accessor)(_this.props.getX)(d);
            }).left });
    },

    getHovered: function getHovered(x, y) {
        var closestDataIndex = this.state.bisectX(this.props.data, x);
        //console.log(closestDataIndex, this.props.data[closestDataIndex]);
        return this.props.data[closestDataIndex];
    },

    render: function render() {
        var _props = this.props;
        var data = _props.data;
        var getX = _props.getX;
        var getY = _props.getY;
        var xScale = _props.xScale;
        var yScale = _props.yScale;

        var points = _lodash2['default'].map(data, function (d) {
            return [xScale((0, _utilJs.accessor)(getX)(d)), yScale((0, _utilJs.accessor)(getY)(d))];
        });
        var pathStr = pointsToPathStr(points);

        return _react2['default'].createElement(
            'g',
            { className: this.props.name },
            _react2['default'].createElement('path', { d: pathStr })
        );
    }
});

function pointsToPathStr(points) {
    // takes array of points in [[x, y], [x, y]... ] format
    // returns SVG path string in "M X Y L X Y" format
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#Line_commands
    return _lodash2['default'].map(points, function (_ref, i) {
        var _ref2 = _slicedToArray(_ref, 2);

        var x = _ref2[0];
        var y = _ref2[1];

        var command = i === 0 ? 'M' : 'L';
        return command + ' ' + x + ' ' + y;
    }).join(' ');
}

exports['default'] = LineChart;
module.exports = exports['default'];