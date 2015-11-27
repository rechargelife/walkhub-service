// Walkhub
// Copyright (C) 2015 Pronovix
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React from "react";
import {Link} from "react-router";
import {csrfToken} from "util";
import {t} from "t";

class Navbar extends React.Component {

	static defaultProps = {
		loggedin: false,
		config: {},
		className: "",
	}

	isExternal(link) {
		return link.indexOf("http") === 0 || link.indexOf("/api") === 0;
	}

	linkTarget(link) {
		return link.indexOf("http") === 0 ? "_blank" : "_self";
	}

	renderMenuItem = (item, i) => {
		if (!(item.loggedin === null || item.loggedin === undefined) && item.loggedin != this.props.loggedin) {
			return null;
		}

		const icon = item.icon ?
			<span className={"glyphicon glyphicon-"+item.icon} aria-hidden="true"></span> :
			null;

		item.label = t(item.label);
		item.path = item.path.replace("CSRF_TOKEN", csrfToken);

		const target = this.linkTarget(item.path);
		return this.isExternal(item.path) ?
			<a key={i} href={item.path} className={item.className} target={target}>{icon} {item.label}</a> :
			<Link key={i} to={item.path} className={item.className}>{icon} {item.label}</Link>;
	};

	wrapInLi = (item, i) => {
		return <li key={i}>{item}</li>;
	};

	render() {
		const header = this.props.config.header ? this.props.config.header.map(this.renderMenuItem) : null;
		const left = this.props.config.left ? this.props.config.left.map(this.renderMenuItem).map(this.wrapInLi) : null;
		const right = this.props.config.right ? this.props.config.right.map(this.renderMenuItem).map(this.wrapInLi) : null;

		return (
			<nav className={"navbar "+this.props.className} role="navigation">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-to-collapse">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						{header}
					</div>
					<div className="collapse navbar-collapse" id="navbar-to-collapse">
						<ul className="nav navbar-nav">
							{left}
						</ul>
						<ul className="nav navbar-nav navbar-right">
							{right}
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;
