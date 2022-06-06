class ApplicationJob < ActiveJob::Base
    #These jobs are safe to ignore if the records are no longer available.
end
