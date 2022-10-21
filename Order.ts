
export interface Order {
	id: authly.Identifier;
	number?: string;
	client?: string;
	created: isoly.DateTime;
	customer?: Contact | authly.Identifier;
	items: number | Item | Item[];
	currency: isoly.Currency;
	payment: Payment;
	subscription?: authly.Identifier;
	event?: Event[];
	status?: Status[] | OrderStatusList;
	theme?: string;
	meta?: any;
	callback?: string;
	language?: isoly.Language;
	category?: "purchase" | "withdrawal";
}
export namespace Order {
	export function is(value: Order | any): value is Order {
		return (
			typeof value == "object" &&
			authly.Identifier.is(value.id, 16) &&
			(typeof value.number == "string" || value.number == undefined) &&
			(typeof value.client == "string" || value.client == undefined) &&
			isoly.DateTime.is(value.created) &&
			(value.customer == undefined || Contact.is(value.customer) || authly.Identifier.is(value.customer, 16)) &&
			Item.canBe(value.items) &&
			isoly.Currency.is(value.currency) &&
			Payment.is(value.payment) &&
			(value.subscription == undefined || authly.Identifier.is(value.subscription, 4)) &&
			(value.event == undefined || (Array.isArray(value.event) && value.event.every(Event.is))) &&
			(value.status == undefined ||
				(Array.isArray(value.status) && value.status.every(Status.is)) ||
				OrderStatusList.is(value.status)) &&
			(value.theme == undefined || typeof value.theme == "string") &&
			(typeof value.callback == "string" || value.callback == undefined) &&
			(value.language == undefined || isoly.Language.is(value.language)) &&
			(value.category == undefined || value.category == "purchase" || value.category == "withdrawal")
		);
	}
	export function flaw(value: Order | any): gracely.Flaw {
		return {
			type: "model.Order",
			flaws: typeof value != "object"
				? undefined
				: ([
					authly.Identifier.is(value.id, 16) || {
						property: "id",
						type: "authly.Identifier",
						condition: "length == 16",
					},
					typeof value.number == "string" ||
					value.number == undefined || { property: "number", type: "string | undefined" },
					typeof value.client == "string" ||
					value.client == undefined || { property: "client", type: "string | undefined" },
					isoly.DateTime.is(value.created) || { property: "created", type: "DateTime" },
					value.customer == undefined ||
					Contact.is(value.customer) ||
					authly.Identifier || { property: "customer", type: "Customer | undefined" },
					Item.canBe(value.items) || { property: "items", type: "number | Item | Item[]" },
					isoly.Currency.is(value.currency) || { property: "currency", type: "Currency" },
					Payment.is(value.payment) || { property: "payment", type: "Payment" },
					value.event == undefined ||
					(Array.isArray(value.event) && value.event.every(Event.is)) || {
						property: "event",
						type: "Event[] | undefined",
					},
					value.status == undefined ||
					(Array.isArray(value.status) && value.status.every(Status.is)) ||
					StatusList.is(value.status) || {
						property: "status",
						type: "Status[] | { [status in Status]?: number | undefined } | undefined",
					},
					value.theme == undefined ||
					typeof value.theme == "string" || { property: "theme", type: "string | undefined" },
					value.callback == undefined ||
					typeof value.callback == "string" || { property: "callback", type: "string | undefined" },
					value.language == undefined ||
					isoly.Language.is(value.language) || { property: "language", type: "isoly.Language | undefined" },
					value.category == undefined ||
					value.category == "purchase" ||
					value.category == "withdrawal" || {
						property: "category",
						type: `"purchase" | "withdrawal" | undefined`,
					},
				].filter(gracely.Flaw.is) as gracely.Flaw[]),
		};
	}
}
