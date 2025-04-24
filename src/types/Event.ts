export interface Event {
    _id: string;
    title: string;
    flyerFront: string;
    attending: number;
    date: string;
    city: string;
    country: string;
    contentUrl: string;
    startTime: string;
    endTime: string;
    private: boolean;
    artists: any[];
    venue: {
        id: string;
        name: string;
        contentUrl: string;
    };
    pick: {
        id: string;
        blurb: string;
    };
    __v?: number;
}

export interface EventsGroupedByDate {
    [date: string]: Event[];
}
