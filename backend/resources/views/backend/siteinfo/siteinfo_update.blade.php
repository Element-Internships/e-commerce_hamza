@extends('admin.admin_master')
@section('admin')

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>


<div class="page-wrapper">
			<div class="page-content">
				<!--breadcrumb-->
				<div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
	<div class="breadcrumb-title pe-3">Site Info Update</div>
	<div class="ps-3">
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb mb-0 p-0">
				<li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
				</li>
				<li class="breadcrumb-item active" aria-current="page">Site Info Update</li>
			</ol>
		</nav>
	</div>
 





</div>



<!--end breadcrumb-->
<div class="container">
	<div class="main-body">
		<div class="row"> 

			<div class="col-lg-12">



<form method="post" action="{{ route('update.siteinfo') }}" > 
	 @csrf

	 <input type="hidden" name="id" value="{{ $siteinfo->id }}">
	 

				<div class="card">
					<div class="card-body">

						<div class="row mb-3"> 
							<div class="col-sm-3">
								<h6 class="mb-0">About </h6>
							</div>
							<div class="col-sm-9 text-secondary">
								<textarea name="about" rows="6" class="form-control">{{ $siteinfo->about }}</textarea>
							</div>
						</div>



<div class="row mb-3"> 
	<div class="col-sm-3">
		<h6 class="mb-0">Refund Policy </h6>
	</div>
	<div class="col-sm-9 text-secondary">
		<textarea name="refund" rows="6" class="form-control">{{ $siteinfo->refund }}</textarea>
	</div>
</div>



<div class="row mb-3"> 
	<div class="col-sm-3">
		<h6 class="mb-0">How To Purchase </h6>
	</div>
	<div class="col-sm-9 text-secondary">
		<textarea name="parchase_guide" rows="6" class="form-control">{{ $siteinfo->parchase_guide }}</textarea>
	</div>
</div>



<div class="row mb-3"> 
	<div class="col-sm-3">
		<h6 class="mb-0">Privacy Policy </h6>
	</div>
	<div class="col-sm-9 text-secondary">
		<textarea name="privacy" rows="6" class="form-control">{{ $siteinfo->privacy }}</textarea>
	</div>
</div>



<div class="row mb-3"> 
	<div class="col-sm-3">
		<h6 class="mb-0">Address </h6>
	</div>
	<div class="col-sm-9 text-secondary">
		<textarea name="address" rows="6" class="form-control">{{ $siteinfo->address }}</textarea>
	</div>
</div>



 


 


<div class="row mb-3">
	<div class="col-sm-3">
		<h6 class="mb-0">android_app_link </h6>
	</div>
	<div class="col-sm-9 text-secondary">
		<input type="text" name="android_app_link"  class="form-control" value="{{ $siteinfo->android_app_link }}" >
	</div>
</div>
 

 <div class="row mb-3">
	<div class="col-sm-3">
		<h6 class="mb-0">ios_app_link </h6>
	</div>
	<div class="col-sm-9 text-secondary">
		<input type="text" name="ios_app_link"  class="form-control" value="{{ $siteinfo->ios_app_link }}" >
	</div>
</div>
 


 <div class="row mb-3">
	<div class="col-sm-3">
		<h6 class="mb-0">facbook_link </h6>
	</div>
	<div class="col-sm-9 text-secondary">
		<input type="text" name="facbook_link"  class="form-control" value="{{ $siteinfo->facbook_link }}" >
	</div>
</div>
 


 <div class="row mb-3">
	<div class="col-sm-3">
		<h6 class="mb-0">	twitter_link </h6>
	</div>
	<div class="col-sm-9 text-secondary">
		<input type="text" name="twitter_link"  class="form-control" value="{{ $siteinfo->twitter_link }}" >
	</div>
</div>
 


 <div class="row mb-3">
	<div class="col-sm-3">
		<h6 class="mb-0">instagram_link </h6>
	</div>
	<div class="col-sm-9 text-secondary">
		<input type="text" name="instagram_link"  class="form-control" value="{{ $siteinfo->instagram_link }}" >
	</div>
</div>
 


 <div class="row mb-3">
	<div class="col-sm-3">
		<h6 class="mb-0">copyright_text </h6>
	</div>
	<div class="col-sm-9 text-secondary">
		<input type="text" name="copyright_text"  class="form-control" value="{{ $siteinfo->copyright_text }}" >
	</div>
</div>
 

 
 


 
<div class="row">
	<div class="col-sm-3"></div>
	<div class="col-sm-9 text-secondary">
		<input type="submit" class="btn btn-primary px-4" value="Update SiteInfo">
	</div>
</div>
					</div>
				</div>


</form>
				 
 



							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

 
		<script src="https://cdn.tiny.cloud/1/your-api-key/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>
		<script>
			tinymce.init({
			  selector: '#mytextarea'
			});
			tinymce.init({
			  selector: '#mytextarea1'
			});
			tinymce.init({
			  selector: '#mytextarea2'
			});
			tinymce.init({
			  selector: '#mytextarea3'
			});
			tinymce.init({
			  selector: '#mytextarea4'
			});
		</script>
		



@endsection