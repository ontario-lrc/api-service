import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable, Injector} from "@angular/core";
import {Observable} from "rxjs";

@Injectable(
	{
		providedIn: "root"
	}
)

export class ApiService
{
	private static _httpClient: HttpClient;
	private static _injector: Injector;

	protected static delete<T, U>(url: string, data?: U): Observable<T>
	{
		if(data)
		{
			const deleteConst: string = "DELETE";

			return ApiService.httpClient.request<T>(deleteConst, url, {body: data});
		}

		return ApiService.httpClient.delete<T>(url);
	}

	protected static get httpClient(): HttpClient
	{
		if(!ApiService._httpClient)
		{
			ApiService.httpClient = ApiService.injector.get(HttpClient);
		}

		return ApiService._httpClient;
	}

	protected static get<T>(url: string): Observable<T>
	{
		return ApiService.httpClient.get<T>(url);
	}

	protected static get injector(): Injector
	{
		return ApiService._injector;
	}

	protected static post<T, U>(url: string, data: U, headers?: HttpHeaders): Observable<T>
	{
		return ApiService.httpClient.post<T>(url, data, headers ? {headers} : ApiService.applicationJsonHttpHeader);
	}

	protected static put<T, U>(url: string, data: U): Observable<T>
	{
		return ApiService.httpClient.put<T>(url, data);
	}

	protected static readonly applicationJsonHttpHeader: {headers: HttpHeaders} =
		{
			headers: new HttpHeaders(
				{
					"Content-Type": "application/json"
				}
			)
		};

	protected static set httpClient(httpClient: HttpClient)
	{
		ApiService._httpClient = httpClient;
	}

	protected static set injector(injector: Injector)
	{
		ApiService._injector = injector;
	}
}